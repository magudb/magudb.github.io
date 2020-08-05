module Jekyll
  module Algolia
    module Hooks
      def self.before_indexing_each(record, node, context)
        record[:links] = node.to_html

        record
      end
    end
  end
end