/// <reference types="cypress" />

def choose_menu(menu_path)
  items = menu_path.strip.split(/\s*>\s*/)
  links = "$('#menuDropDown').find('a:contains(\"#{items.shift}\")')"
  items.each do |item|
    links = links + ".parent().find('a:contains(\"#{item}\")').filter(function() {return $(this).text() === \"#{item}\"})"
  end
  page.execute_script(links + "[0].click()")
end



if ARGV[0] == '--start'
    escolhe_menu
end