(function ($, Drupal) {
  Drupal.behaviors.solrSortToggle = {
    attach: function (context, settings) {

      // Load only the view-search-results filter form.
      const $form = $('.view-search-results form.views-exposed-form', context);
      if (!$form) return;

      // Detect which search results are available by
      // detecting which facets are loaded. Cannot use
      // php in a module to do this because it would have
      // to loop through ALL search results, not just
      // results on the current page.
      const hasPageType = $('fieldset[id^="edit-page-type"]').length ? true : false;
      const hasPageTypeEvent = $('input[name="page_type[events]"]').length ? true : false;
      const hasPageTypePage = $('input[name="page_type[page]"]').length ? true : false;
      const hasPageTypeJob = $('input[name="page_type[job_posting]"]').length ? true : false;
      const hasPageTypeLanding = $('input[name="page_type[landing_page]"]').length ? true : false;
      const hasPageTypeArticle = $('input[name="page_type[article]"]').length ? true : false;
      const hasDirectoryType = $('fieldset[id^="edit-directory-type"]').length ? true : false;
      const hasDirectoryTypeParishes = $('input[name="directory_type[parishes]"]').length ? true : false; // Unused for now
      const hasDirectoryTypeSchools = $('input[name="directory_type[schools]"]').length ? true : false; // Unused for now
      const hasUserType = $('fieldset[id^="edit-role"]').length ? true : false;

      // Hide empty fieldsets one-by-one to avoid dealing
      // with messy edge cases/
      if (!$('input[type="checkbox"][name^="page_type"]').length) {
        $('fieldset[id^="edit-page-type"]').hide();
      }
      if (!$('input[type="checkbox"][name^="directory_type"]').length) {
        $('fieldset[id^="edit-directory-type"]').hide();
      }
      if (!$('input[type="checkbox"][name^="role"]').length) {
        $('fieldset[id^="edit-role"]').hide();
      }
      if (!$('input[type="checkbox"][name^="diocesan_department"]').length) {
        $('fieldset[id^="edit-diocesan-department"]').hide();
      }
      if (!$('input[type="checkbox"][name^="diocesan_ministries"]').length) {
        $('fieldset[id^="edit-diocesan-ministries"]').hide();
      }
      if (!$('input[type="radio"][name="sort_by"]').length) {
        $('fieldset[id^="edit-sort-by"]').hide();
        $('fieldset[id^="edit-sort-order"]').hide();
      }

      // Hide fieldsets that are inapplicable to current
      // search results.
      if (!hasPageTypePage && !hasPageTypeJob && !hasPageTypeLanding) {
        $('fieldset[id^="edit-created-date"]').hide();
      }
      if (!hasPageTypeArticle) {
        $('fieldset[id^="edit-published-dates"]').hide();
      }
      if (!hasPageTypeEvent) {
        $('fieldset[id^="edit-event-date"]').hide();
      }

      // Hide specific sorts based on current
      // search results.
      if (!(hasPageType || hasDirectoryType)) {
        $form
          .find('input[type="radio"][name="sort_by"][value="relevance"]')
          .closest('.js-form-item')
          .hide();
      }
      if (!(hasPageTypePage || hasPageTypeJob || hasPageTypeLanding)) {
        $form
          .find('input[type="radio"][name="sort_by"][value="created"]')
          .closest('.js-form-item')
          .hide();
      }
      if (!hasPageTypeEvent) {
        $form
          .find('input[type="radio"][name="sort_by"][value="field_date"]')
          .closest('.js-form-item')
          .hide();
      }
      if (!hasPageTypeArticle) {
        $form
          .find('input[type="radio"][name="sort_by"][value="published_date"]')
          .closest('.js-form-item')
          .hide();
      }
      if (!hasUserType) {
        $form
          .find('input[type="radio"][name="sort_by"][value="last_name"]')
          .closest('.js-form-item')
          .hide();
      }

      // Set sort_by and sort_order if illegal values
      // are present upon a new search with new result types.
      const params = new URLSearchParams(window.location.search);
      const sort_by = params.get('sort_by');
      const url = new URL(window.location.href);

      // If results have only users make sure last_name
      // sort is checked and sorted asc.
      if (hasUserType && !hasPageType && !hasDirectoryType) {
        if (sort_by != 'last_name') {
          url.searchParams.set('sort_by', 'last_name');
          url.searchParams.set('sort_order', 'ASC');
          window.location.href = url.toString();
        }
      }

      // If results do not have users and yet is sorted
      // by last name, then change the sort to relevance
      // and order by DESC
      if (!hasUserType && (hasPageType || hasDirectoryType) && sort_by === 'last_name') {
        url.searchParams.set('sort_by', 'relevance');
        url.searchParams.set('sort_order', 'DESC');
        window.location.href = url.toString();
      }

      // If all sort_bys are hidden, then remove the
      // entire set of refinement fields beneath the
      // search text input.
      if ($('div.form-item-sort-by').filter(':visible').length === 0) {
        $('#edit-secondary').hide();
      }
    }
  }
})(jQuery, Drupal);
