# Custom Solr

Todo: This document will be completed after the first round of initial
testing, client review, and following iterations.

This custom module installs a Solr search feature on diocesan websites that
combines a selection of contributed modules and a small amount of custom
code. This module establishes baseline functionality that can be extended
for other sites.

## Installation
---

Run <code>$ composer require faithcatholic/custom_solr</code> on the command
line to pull the latest version of the module. Before installing the module,
be sure to install all dependencies, which include a selection of
<code>search_api*</code> modules, <code>better_exposed_filters</code>,
<code>facets</code>, and <code>block_class</code>.

## Setup
---

Navigate to <code>Admin > Configuration > Search and metadata > Search API</code>
and edit the top-level server configuration named "SOLR". Make sure
the server is enabled, and for Platform.sh sites, select the "Standard"
Solr Connector and keep the default settings.

Next, edit the Default index and verify that "SOLR" is selected under
the Server section. Keep default settings unless you know what you are
doing.

## Customization of functionality
---

You can add additional searchable fields using the "Fields" tab on the
Default index settings page. When adding or editing fields, you can set the
importance of each individual field using the "Boost" setting.

You can also add additional processing via the "Processors" tab located
to the right of the Fields tab. Leave default-enabled processors as-is
unless you know what you are doing. Toward the bottom of the Processors
page is are boost fields that apply to entity as a whole. Processor boosts
take precedence before field boosts; both types of boosts apply but
processor boosts have a greater effect on overall sorting.

New filters and sorts can be added to the results page by editing the
"Search Results" view. Be careful to nest appropriate fields under
the appropriate entity-specific filter groups, with the exception of facet
filters that display above the grouped filters.

## Customization of styles
---

Stylesheet updates should be made using the <code>*.scss</code> files
in the <code>sass</code> directory, and not in the <code>dist</code> directory.

Similarly, javascript updates should be made in the <code>js</code>
directory.

You can run preprocessing by running <code>$ npm run development</cdoe> or
via gulp <code>$ gulp</code> (to use gulp, you must be able to run the
command, which is installed from <code>gulp_cli</code> in <code>package.json</code>).
