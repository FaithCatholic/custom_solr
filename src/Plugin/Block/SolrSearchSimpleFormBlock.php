<?php

namespace Drupal\custom_solr\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a custom simple Solr search form block,
 * which links to a view that requires exposed filters
 * to be present, even if empty.
 *
 * @Block(
 *   id = "solr_search_simple_form_block",
 *   admin_label = @Translation("Custom solr search"),
 *   category = @Translation("Search")
 * )
 */
class SolrSearchSimpleFormBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $form = <<<HTML
      <form method="get" action="/search" id="search-api-page-block-form-solr-search">
        <input type="text" name="keys" id="edit-keys--3" placeholder="Search...">
        <input type="hidden" name="created_date[min]" value="">
        <input type="hidden" name="created_date[max]" value="">
        <input type="hidden" name="event_date[min]" value="">
        <input type="hidden" name="event_date[max]" value="">
        <input type="hidden" name="published_dates[min]" value="">
        <input type="hidden" name="published_dates[max]" value="">
        <input type="hidden" name="sort_by" value="relevance">
        <input type="hidden" name="sort_order" value="DESC">
        <button type="submit" class="form-submit">Search</button>
      </form>
    HTML;

    return [
      '#type' => 'inline_template',
      '#template' => $form,
    ];
  }
}
