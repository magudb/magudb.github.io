module Jekyll
  module Algolia
    module Hooks
      def self.before_indexing_each(record, node, context)
          record.delete(:html)
          record.delete(:anchor)
          record.delete(:keywords)
          record.delete(:excerpt_html)
          record.delete(:html)
          record.delete(:redirect_from)
          record.delete(:headings)
        record
      end
    end
  end
end