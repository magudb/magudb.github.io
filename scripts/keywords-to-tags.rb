#!/usr/bin/env ruby
# scripts/keywords-to-tags.rb
#
# Optional migration: derive a `tags:` YAML list from each post's existing
# `keywords:` string, so the Topics page can render tag groups. Your `keywords:`
# line is kept (it still feeds the SEO meta). Posts that already have `tags:`
# are skipped. Run from the repo root:
#
#     ruby scripts/keywords-to-tags.rb            # dry run (prints what would change)
#     ruby scripts/keywords-to-tags.rb --write    # actually writes
#
require "yaml"

WRITE = ARGV.include?("--write")
posts = Dir.glob("_posts/*.md")
changed = 0

posts.each do |path|
  raw = File.read(path)
  next unless raw =~ /\A---\s*\n(.*?\n)---\s*\n/m
  front = $1
  body_start = $~.end(0)

  next if front =~ /^\s*tags\s*:/         # already tagged
  kw = front[/^\s*keywords\s*:\s*["']?(.+?)["']?\s*$/, 1]
  next if kw.nil? || kw.strip.empty?

  tags = kw.split(",").map { |t| t.strip }.reject(&:empty?).uniq
  next if tags.empty?

  yaml_list = "tags: [" + tags.map { |t| t.include?(",") ? %("#{t}") : t }.join(", ") + "]\n"
  new_front = front + yaml_list
  new_raw = "---\n" + new_front + "---\n" + raw[body_start..]

  changed += 1
  if WRITE
    File.write(path, new_raw)
    puts "tagged: #{File.basename(path)} -> #{tags.join(', ')}"
  else
    puts "would tag: #{File.basename(path)} -> #{tags.join(', ')}"
  end
end

puts "\n#{WRITE ? 'Updated' : 'Would update'} #{changed} of #{posts.size} posts."
puts "Dry run — re-run with --write to apply." unless WRITE
