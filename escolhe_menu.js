/// <reference types="cypress" />

function escolhe_menu(menuPath) {
    const items = menuPath.split(' > ');
    let links = '';
    items.forEach((item, index) => {
        links += index === 0
            ? `$('#menuDropDown').find('a:contains("${item}")')`
            : `.parent().find('a:contains("${item}")')`
    },'');
    links + "[0].click()"
}

export { escolhe_menu } 