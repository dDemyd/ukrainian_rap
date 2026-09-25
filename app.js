(function() {
  'use strict';

  // Safe data accessor
  const RAP_DATA = window.RAP_DATA || {
    TIERS: {},
    ARTISTS: [],
    getYouTubeMusicSearchUrl: (name, track = '') => `https://music.youtube.com/search?q=${encodeURIComponent(track ? `${name} ${track}` : name)}`
  };

  const { TIERS, ARTISTS, getYouTubeMusicSearchUrl } = RAP_DATA;
  const STORAGE_KEY = 'ukr_rap_iceberg_notes_v4';

  function getInitials(name) {
    if (!name) return 'UA';
    const clean = name.replace(/[«»"'()]/g, '').trim();
    const parts = clean.split(/[\s_-]+/);
    if (parts.length >= 2 && parts[0] && parts[1]) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return clean.slice(0, 2).toUpperCase();
  }

  class IcebergApp {
    constructor() {
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      this.artists = this.loadArtists();
      this.currentTierFilter = 'all';
      this.searchQuery = '';
      this.currentView = isMobile ? 'grid' : 'iceberg'; // Default 'grid' (cards) on mobile!
      this.currentModalArtistIndex = -1;
      this.filteredArtists = [...this.artists];
      this.isEditingModal = false;

      this.initElements();
      this.bindEvents();
      this.switchView(this.currentView);
      this.updateStats();
    }

    // Safe localStorage loading
    loadArtists() {
      try {
        const saved = window.localStorage ? (window.localStorage.getItem(STORAGE_KEY) || window.localStorage.getItem('ukr_rap_iceberg_notes_v3')) : null;
        if (saved) {
          const parsed = JSON.parse(saved);
          return ARTISTS.map(base => {
            const custom = parsed.find(p => p.id === base.id || p.name.toLowerCase() === base.name.toLowerCase());
            if (!custom) return base;
            return {
              ...base,
              ...custom,
              image: (custom.image && custom.image.trim()) ? custom.image : base.image,
              id: base.id,
              tier: base.tier
            };
          });
        }
      } catch (e) {
        console.warn('Could not read from localStorage:', e);
      }
      return [...ARTISTS];
    }

    saveArtists() {
      try {
        if (window.localStorage) {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.artists));
        }
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }
    }

    initElements() {
      // Views & Containers
      this.icebergView = document.getElementById('iceberg-view');
      this.cardsView = document.getElementById('cards-view');
      this.noResults = document.getElementById('no-results');
      this.cloudTier0 = document.getElementById('cloud-tier-0');
      this.cloudTier1 = document.getElementById('cloud-tier-1');
      this.cloudTier2 = document.getElementById('cloud-tier-2');
      this.cloudTier3 = document.getElementById('cloud-tier-3');

      // Controls
      this.searchInput = document.getElementById('search-input');
      this.filterTierGroup = document.getElementById('filter-tier-group');
      this.viewIcebergBtn = document.getElementById('view-iceberg-btn');
      this.viewGridBtn = document.getElementById('view-grid-btn');

      // Bulk Notes Panel
      this.notesSection = document.getElementById('notes-import-section');
      this.btnToggleNotes = document.getElementById('btn-toggle-notes');
      this.btnCloseNotes = document.getElementById('btn-close-notes');
      this.rawNotesInput = document.getElementById('raw-notes-input');
      this.btnSaveNotes = document.getElementById('btn-save-notes');

      // Stats
      this.statTotalArtists = document.getElementById('stat-total-artists');
      this.statTotalTracks = document.getElementById('stat-total-tracks');
      this.statWithNotes = document.getElementById('stat-with-notes');

      // Image Dialog
      this.imageDialog = document.getElementById('image-dialog');
      this.btnShowImage = document.getElementById('btn-show-image');
      this.imageCloseBtn = document.getElementById('image-close-btn');

      // Artist Detail Dialog
      this.artistDialog = document.getElementById('artist-dialog');
      this.modalCloseBtn = document.getElementById('modal-close-btn');
      this.modalEditBtn = document.getElementById('modal-edit-btn');
      this.modalViewMode = document.getElementById('modal-view-mode');
      this.modalEditMode = document.getElementById('modal-edit-mode');

      // Modal Display Fields
      this.modalTierBadge = document.getElementById('modal-artist-tier-badge');
      this.modalVerdictBadge = document.getElementById('modal-verdict-badge');
      this.modalName = document.getElementById('modal-artist-name');
      this.modalCoverImg = document.getElementById('modal-cover-img');
      this.modalCoverFallback = document.getElementById('modal-cover-fallback');
      this.modalCoverInitials = document.getElementById('modal-cover-initials');
      this.modalTracksList = document.getElementById('modal-tracks-list');
      this.modalBonusSection = document.getElementById('modal-bonus-section');
      this.modalBonusList = document.getElementById('modal-bonus-list');
      this.modalImpression = document.getElementById('modal-impression-content');
      this.modalYtArtistLink = document.getElementById('modal-yt-artist-link');
      this.modalPrevBtn = document.getElementById('modal-prev-btn');
      this.modalNextBtn = document.getElementById('modal-next-btn');

      // Modal Edit Inputs
      this.editImageUrl = document.getElementById('edit-image-url');
      this.editTrack1 = document.getElementById('edit-track-1');
      this.editTrack2 = document.getElementById('edit-track-2');
      this.editTrack3 = document.getElementById('edit-track-3');
      this.editTracksBonus = document.getElementById('edit-tracks-bonus');
      this.editVerdict = document.getElementById('edit-verdict');
      this.editImpression = document.getElementById('edit-impression');
      this.btnCancelEdit = document.getElementById('btn-cancel-edit');
    }

    bindEvents() {
      // Search
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.applyFilters();
      });

      // Filter Pills
      this.filterTierGroup.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-pill');
        if (!btn) return;
        this.filterTierGroup.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentTierFilter = btn.dataset.tier;
        this.applyFilters();

        // Smooth scroll active pill into view
        const pillOffset = btn.offsetLeft - (this.filterTierGroup.clientWidth / 2) + (btn.clientWidth / 2);
        this.filterTierGroup.scrollTo({ left: pillOffset, behavior: 'smooth' });
      });

      // Enable horizontal scroll on mouse wheel for desktop/mobile testing
      this.filterTierGroup.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0 && !e.deltaX) {
          this.filterTierGroup.scrollLeft += e.deltaY;
          e.preventDefault();
        }
      }, { passive: false });

      // View Switcher
      this.viewIcebergBtn.addEventListener('click', () => this.switchView('iceberg'));
      this.viewGridBtn.addEventListener('click', () => this.switchView('grid'));

      // Event Delegation for clicking on artist tags
      this.icebergView.addEventListener('click', (e) => {
        const tag = e.target.closest('.artist-tag');
        if (tag && tag.dataset.id) {
          this.openArtistModal(tag.dataset.id);
        }
      });

      // Event Delegation for clicking on artist cards
      this.cardsView.addEventListener('click', (e) => {
        if (e.target.closest('a')) return; // Ignore link clicks
        const card = e.target.closest('.artist-card');
        if (card && card.dataset.id) {
          this.openArtistModal(card.dataset.id);
        }
      });

      // Bulk Notes Panel Toggle
      this.btnToggleNotes.addEventListener('click', () => {
        const isHidden = this.notesSection.style.display === 'none' || !this.notesSection.style.display;
        this.notesSection.style.display = isHidden ? 'block' : 'none';
        if (isHidden) {
          this.rawNotesInput.focus();
        }
      });

      this.btnCloseNotes.addEventListener('click', () => {
        this.notesSection.style.display = 'none';
      });

      this.btnSaveNotes.addEventListener('click', () => this.parseAndImportNotes());

      // Original Image Modal
      this.btnShowImage.addEventListener('click', () => this.openDialog(this.imageDialog));
      this.imageCloseBtn.addEventListener('click', () => this.closeDialog(this.imageDialog));
      this.imageDialog.addEventListener('click', (e) => this.handleBackdropClick(e, this.imageDialog));

      // Artist Dialog
      this.modalCloseBtn.addEventListener('click', () => this.closeDialog(this.artistDialog));
      this.artistDialog.addEventListener('click', (e) => this.handleBackdropClick(e, this.artistDialog));

      this.modalPrevBtn.addEventListener('click', () => this.navigateModal(-1));
      this.modalNextBtn.addEventListener('click', () => this.navigateModal(1));

      // Edit Mode inside Modal
      this.modalEditBtn.addEventListener('click', () => this.toggleModalEditMode());
      this.btnCancelEdit.addEventListener('click', () => this.toggleModalEditMode(false));
      this.modalEditMode.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveCurrentArtistFromModal();
      });

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (this.artistDialog && this.artistDialog.open) {
          if (e.key === 'Escape') {
            this.closeDialog(this.artistDialog);
          } else if (e.key === 'ArrowLeft' && !this.isEditingModal) {
            this.navigateModal(-1);
          } else if (e.key === 'ArrowRight' && !this.isEditingModal) {
            this.navigateModal(1);
          }
        }
      });
    }

    openDialog(dialogEl) {
      if (!dialogEl) return;
      if (typeof dialogEl.showModal === 'function') {
        if (!dialogEl.open) {
          dialogEl.showModal();
        }
      } else {
        dialogEl.setAttribute('open', '');
        dialogEl.style.display = 'block';
      }
    }

    closeDialog(dialogEl) {
      if (!dialogEl) return;
      if (typeof dialogEl.close === 'function') {
        if (dialogEl.open) {
          dialogEl.close();
        }
      } else {
        dialogEl.removeAttribute('open');
        dialogEl.style.display = 'none';
      }
    }

    handleBackdropClick(e, dialogEl) {
      if (e.target !== dialogEl) return;
      const rect = dialogEl.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        this.closeDialog(dialogEl);
      }
    }

    switchView(mode) {
      this.currentView = mode;
      if (mode === 'iceberg') {
        this.viewIcebergBtn.classList.add('active');
        this.viewGridBtn.classList.remove('active');
        this.icebergView.style.display = 'flex';
        this.cardsView.style.display = 'none';
      } else {
        this.viewGridBtn.classList.add('active');
        this.viewIcebergBtn.classList.remove('active');
        this.icebergView.style.display = 'none';
        this.cardsView.style.display = 'grid';
      }
      this.renderFilteredView();
    }

    applyFilters() {
      this.filteredArtists = this.artists.filter(artist => {
        const matchesTier = this.currentTierFilter === 'all' || artist.tier.toString() === this.currentTierFilter;
        if (!matchesTier) return false;

        if (!this.searchQuery) return true;
        const nameMatch = artist.name.toLowerCase().includes(this.searchQuery);
        const impressionMatch = (artist.impression || '').toLowerCase().includes(this.searchQuery);
        const verdictMatch = (artist.verdict || '').toLowerCase().includes(this.searchQuery);
        const tracksMatch = (artist.tracks || []).some(t => t.toLowerCase().includes(this.searchQuery));
        const bonusMatch = (artist.bonusTracks || []).some(t => t.toLowerCase().includes(this.searchQuery));
        return nameMatch || impressionMatch || verdictMatch || tracksMatch || bonusMatch;
      });

      this.renderFilteredView();
      this.updateStats();
    }

    render() {
      this.applyFilters();
      this.updateStats();
    }

    updateStats() {
      this.statTotalArtists.textContent = this.artists.length;
      
      const filledCount = this.artists.filter(a => a.impression && a.impression.trim().length > 0).length;
      this.statWithNotes.textContent = filledCount;

      let trackCount = 0;
      this.artists.forEach(a => {
        trackCount += (a.tracks && a.tracks.length > 0) ? a.tracks.length : 3;
        if (a.bonusTracks) trackCount += a.bonusTracks.length;
      });
      this.statTotalTracks.textContent = `${trackCount}+`;
    }

    renderFilteredView() {
      const hasResults = this.filteredArtists.length > 0;
      this.noResults.style.display = hasResults ? 'none' : 'block';

      if (this.currentView === 'iceberg') {
        this.renderIcebergView();
      } else {
        this.renderGridView();
      }
    }

    renderIcebergView() {
      const tier0 = this.filteredArtists.filter(a => a.tier === 0);
      const tier1 = this.filteredArtists.filter(a => a.tier === 1);
      const tier2 = this.filteredArtists.filter(a => a.tier === 2);
      const tier3 = this.filteredArtists.filter(a => a.tier === 3);

      const secTier0 = document.getElementById('section-tier-0');
      const secTier1 = document.getElementById('section-tier-1');
      const secTier2 = document.getElementById('section-tier-2');
      const secTier3 = document.getElementById('section-tier-3');

      if (secTier0) secTier0.style.display = (this.currentTierFilter === 'all' || this.currentTierFilter === '0') && tier0.length > 0 ? 'block' : 'none';
      if (secTier1) secTier1.style.display = (this.currentTierFilter === 'all' || this.currentTierFilter === '1') && tier1.length > 0 ? 'block' : 'none';
      if (secTier2) secTier2.style.display = (this.currentTierFilter === 'all' || this.currentTierFilter === '2') && tier2.length > 0 ? 'block' : 'none';
      if (secTier3) secTier3.style.display = (this.currentTierFilter === 'all' || this.currentTierFilter === '3') && tier3.length > 0 ? 'block' : 'none';

      const cnt0 = document.getElementById('count-tier-0');
      const cnt1 = document.getElementById('count-tier-1');
      const cnt2 = document.getElementById('count-tier-2');
      const cnt3 = document.getElementById('count-tier-3');

      if (cnt0) cnt0.textContent = `${tier0.length} артистів`;
      if (cnt1) cnt1.textContent = `${tier1.length} артистів`;
      if (cnt2) cnt2.textContent = `${tier2.length} артистів`;
      if (cnt3) cnt3.textContent = `${tier3.length} артистів`;

      if (this.cloudTier0) this.cloudTier0.innerHTML = tier0.map(a => this.createArtistTagHTML(a)).join('');
      if (this.cloudTier1) this.cloudTier1.innerHTML = tier1.map(a => this.createArtistTagHTML(a)).join('');
      if (this.cloudTier2) this.cloudTier2.innerHTML = tier2.map(a => this.createArtistTagHTML(a)).join('');
      if (this.cloudTier3) this.cloudTier3.innerHTML = tier3.map(a => this.createArtistTagHTML(a)).join('');
    }

    createArtistTagHTML(artist) {
      const hasNotes = artist.impression && artist.impression.trim().length > 0;
      const hasImg = Boolean(artist.image && artist.image.trim().length > 5);
      return `
        <button type="button" class="artist-tag tier-${artist.tier}" data-id="${artist.id}" title="${artist.name}${hasNotes ? ' (є замітки)' : ''}">
          ${hasImg ? `<img src="${artist.image}" alt="" class="tag-avatar" loading="lazy" onerror="this.style.display='none'">` : ''}
          <span>${artist.name}</span>
          ${hasNotes ? '<span class="has-notes-indicator" title="Є замітки"></span>' : ''}
        </button>
      `;
    }

    renderGridView() {
      this.cardsView.innerHTML = this.filteredArtists.map(artist => {
        const tierConfig = TIERS[artist.tier] || { badge: 'Рівень ' + artist.tier };
        const hasNotes = artist.impression && artist.impression.trim().length > 0;
        const initials = getInitials(artist.name);
        const hasImage = Boolean(artist.image);
        
        const tracksHTML = (artist.tracks && artist.tracks.length > 0)
          ? artist.tracks.map((t, idx) => `
              <div class="track-preview-item">
                <span class="track-number">0${idx + 1}</span>
                <span>${t}</span>
              </div>
            `).join('')
          : `
            <div class="track-preview-item">
              <span class="track-number">#</span>
              <span class="card-empty-note">3 топ-треки з YouTube Music</span>
            </div>
          `;

        const impressionHTML = hasNotes
          ? `<div class="card-impression-snippet">“${artist.impression}”</div>`
          : `<div class="card-empty-note">Натисніть для перегляду та додавання вражень</div>`;

        return `
          <div class="artist-card" data-id="${artist.id}">
            <div>
              <div class="card-cover-container">
                ${hasImage ? `
                  <img src="${artist.image}" 
                       alt="${artist.name}" 
                       class="card-cover-img" 
                       loading="lazy" 
                       onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';">
                  <div class="card-avatar-fallback" style="display: none;">
                    <div class="vinyl-center-badge"><span class="fallback-initials">${initials}</span></div>
                  </div>
                ` : `
                  <div class="card-avatar-fallback">
                    <div class="vinyl-center-badge"><span class="fallback-initials">${initials}</span></div>
                  </div>
                `}
                <span class="card-tier-badge badge-tier-${artist.tier} card-cover-badge">${tierConfig.badge}</span>
              </div>

              <div class="card-top">
                <h3 class="card-name">${artist.name}</h3>
              </div>
              <div class="card-tracks-preview">${tracksHTML}</div>
              ${impressionHTML}
            </div>
            <div class="card-footer">
              <span class="verdict-tag">${artist.verdict || (hasNotes ? 'Прослухано' : 'В черзі')}</span>
              <a href="${getYouTubeMusicSearchUrl(artist.name)}" target="_blank" rel="noopener noreferrer" class="yt-link-btn" title="Слухати на YouTube Music">
                <span>▶ YT Music</span>
              </a>
            </div>
          </div>
        `;
      }).join('');
    }

    openArtistModal(artistId) {
      const index = this.filteredArtists.findIndex(a => a.id === artistId);
      if (index === -1) return;

      this.currentModalArtistIndex = index;
      this.toggleModalEditMode(false);
      this.renderModalContent();
      this.openDialog(this.artistDialog);
    }

    navigateModal(direction) {
      if (this.filteredArtists.length === 0) return;
      this.currentModalArtistIndex = (this.currentModalArtistIndex + direction + this.filteredArtists.length) % this.filteredArtists.length;
      this.toggleModalEditMode(false);
      this.renderModalContent();
    }

    toggleModalEditMode(forceState) {
      this.isEditingModal = typeof forceState === 'boolean' ? forceState : !this.isEditingModal;
      if (this.isEditingModal) {
        this.modalViewMode.style.display = 'none';
        this.modalEditMode.style.display = 'block';
        this.modalEditBtn.textContent = '👁️ Перегляд';
        this.populateEditForm();
      } else {
        this.modalViewMode.style.display = 'block';
        this.modalEditMode.style.display = 'none';
        this.modalEditBtn.textContent = '✏️ Редагувати';
      }
    }

    populateEditForm() {
      const artist = this.filteredArtists[this.currentModalArtistIndex];
      if (!artist) return;

      this.editImageUrl.value = artist.image || '';
      this.editTrack1.value = (artist.tracks && artist.tracks[0]) || '';
      this.editTrack2.value = (artist.tracks && artist.tracks[1]) || '';
      this.editTrack3.value = (artist.tracks && artist.tracks[2]) || '';
      this.editTracksBonus.value = (artist.bonusTracks && artist.bonusTracks.join(', ')) || '';
      this.editVerdict.value = artist.verdict || '';
      this.editImpression.value = artist.impression || '';
    }

    saveCurrentArtistFromModal() {
      const artist = this.filteredArtists[this.currentModalArtistIndex];
      if (!artist) return;

      const imgVal = this.editImageUrl.value.trim();
      const t1 = this.editTrack1.value.trim();
      const t2 = this.editTrack2.value.trim();
      const t3 = this.editTrack3.value.trim();
      const bonusStr = this.editTracksBonus.value.trim();

      artist.image = imgVal;
      const newTracks = [t1, t2, t3].filter(Boolean);
      artist.tracks = newTracks;

      if (bonusStr) {
        artist.bonusTracks = bonusStr.split(',').map(s => s.trim()).filter(Boolean);
      } else {
        artist.bonusTracks = [];
      }

      artist.verdict = this.editVerdict.value;
      artist.impression = this.editImpression.value.trim();

      // Find in main artists array and update
      const mainIdx = this.artists.findIndex(a => a.id === artist.id);
      if (mainIdx !== -1) {
        this.artists[mainIdx] = { ...artist };
      }

      this.saveArtists();
      this.toggleModalEditMode(false);
      this.renderModalContent();
      this.renderFilteredView();
      this.updateStats();
    }

    renderModalContent() {
      const artist = this.filteredArtists[this.currentModalArtistIndex];
      if (!artist) return;

      const tierConfig = TIERS[artist.tier] || { icon: '🎵', badge: 'Рівень ' + artist.tier };
      const initials = getInitials(artist.name);

      this.modalName.textContent = artist.name;
      this.modalTierBadge.textContent = `${tierConfig.icon} ${tierConfig.badge}`;
      this.modalTierBadge.className = `card-tier-badge badge-tier-${artist.tier}`;

      // Verdict badge in header
      if (this.modalVerdictBadge) {
        if (artist.verdict) {
          this.modalVerdictBadge.textContent = artist.verdict;
          this.modalVerdictBadge.style.display = 'inline-flex';
        } else {
          this.modalVerdictBadge.style.display = 'none';
        }
      }

      // Cover Artwork
      if (artist.image) {
        this.modalCoverImg.src = artist.image;
        this.modalCoverImg.style.display = 'block';
        this.modalCoverFallback.style.display = 'none';
      } else {
        this.modalCoverImg.style.display = 'none';
        this.modalCoverFallback.style.display = 'flex';
        this.modalCoverInitials.textContent = initials;
      }

      // YouTube Music artist link
      this.modalYtArtistLink.href = getYouTubeMusicSearchUrl(artist.name);

      // Listened Tracks
      if (artist.tracks && artist.tracks.length > 0) {
        this.modalTracksList.innerHTML = artist.tracks.map((track, idx) => `
          <div class="track-row">
            <div class="track-info">
              <span class="track-order">#0${idx + 1}</span>
              <span class="track-name">${track}</span>
            </div>
            <a href="${getYouTubeMusicSearchUrl(artist.name, track)}" target="_blank" rel="noopener noreferrer" class="track-yt-btn">
              <span>▶</span> Слухати
            </a>
          </div>
        `).join('');
      } else {
        this.modalTracksList.innerHTML = `
          <div class="track-row">
            <div class="track-info">
              <span class="track-order">1-3</span>
              <span class="track-name" style="color: var(--text-secondary); font-style: italic;">
                3 найпопулярніші пісні на YouTube Music
              </span>
            </div>
            <a href="${getYouTubeMusicSearchUrl(artist.name)}" target="_blank" rel="noopener noreferrer" class="track-yt-btn">
              <span>🔍</span> Топ у YT Music
            </a>
          </div>
        `;
      }

      // Bonus Tracks
      if (artist.bonusTracks && artist.bonusTracks.length > 0) {
        this.modalBonusSection.style.display = 'block';
        this.modalBonusList.innerHTML = artist.bonusTracks.map((track, idx) => `
          <div class="track-row">
            <div class="track-info">
              <span class="track-order">+${idx + 1}</span>
              <span class="track-name">${track}</span>
            </div>
            <a href="${getYouTubeMusicSearchUrl(artist.name, track)}" target="_blank" rel="noopener noreferrer" class="track-yt-btn">
              <span>▶</span> Слухати
            </a>
          </div>
        `).join('');
      } else {
        this.modalBonusSection.style.display = 'none';
      }

      // Impression
      if (artist.impression && artist.impression.trim().length > 0) {
        this.modalImpression.innerHTML = `
          <p style="white-space: pre-line;">${artist.impression}</p>
        `;
      } else {
        this.modalImpression.innerHTML = `
          <p style="color: var(--text-muted); font-style: italic;">
            Замітка для цього артиста поки не додана. Натисніть кнопку «✏️ Редагувати» вище, щоб додати прослухані пісні та ваші емоції!
          </p>
        `;
      }

      // Nav buttons disabled state
      this.modalPrevBtn.disabled = this.filteredArtists.length <= 1;
      this.modalNextBtn.disabled = this.filteredArtists.length <= 1;
    }

    parseAndImportNotes() {
      const rawText = this.rawNotesInput.value.trim();
      if (!rawText) {
        alert('Будь ласка, вставте текст заміток.');
        return;
      }

      let parsedCount = 0;

      this.artists.forEach(artist => {
        const safeName = artist.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(?:^|\\n)\\s*(?:[-*•#\\d.]*\\s*)?(${safeName})\\s*[:\\-—\\n]`, 'i');
        const match = rawText.match(regex);
        if (match) {
          const startIndex = match.index;
          const restText = rawText.slice(startIndex + match[0].length);
          const nextArtistMatch = restText.search(/\n\s*([A-Za-zА-Яа-яЇїІіЄє0-9\s_-]+)\s*[:\-—]/);
          const block = nextArtistMatch !== -1 ? restText.slice(0, nextArtistMatch) : restText;

          const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
          const tracks = [];
          let impressionLines = [];

          lines.forEach(line => {
            const trackMatch = line.match(/^(?:[1-9]\.|[-*•])\s*(.+)$/);
            if (trackMatch && tracks.length < 5 && !line.toLowerCase().includes('враження') && !line.toLowerCase().includes('емоції')) {
              tracks.push(trackMatch[1]);
            } else {
              impressionLines.push(line);
            }
          });

          if (tracks.length > 0) {
            artist.tracks = tracks.slice(0, 3);
            if (tracks.length > 3) {
              artist.bonusTracks = tracks.slice(3);
            }
          }

          const impressionText = impressionLines.join('\n').trim();
          if (impressionText) {
            artist.impression = impressionText;
          }

          parsedCount++;
        }
      });

      this.saveArtists();
      this.render();
      alert(`Опрацьовано заміток: знайдено та оновлено ${parsedCount} артистів!`);
      this.notesSection.style.display = 'none';
    }
  }

  // Safe launcher supporting all loading states
  function startApp() {
    if (window.icebergAppInstance) return;
    try {
      window.icebergAppInstance = new IcebergApp();
    } catch (e) {
      console.error('Error initializing IcebergApp:', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
  } else {
    startApp();
  }
})();
