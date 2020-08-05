module Jekyll
  module Algolia
    module Hooks
      def self.before_indexing_each(record, node, context)
        record[:links] = []
        node.search('a').each do |link|
          record[:links].push(link.content)
        end
        record
      end
    end
  end
end