// Link lists shared by the header dropdowns and the footer columns.
// `groups` are split by a divider in the dropdown; `all` is the catch-all link at the end.

export const shopMenu = {
  groups: [
    ['Nova Series', 'Fruit Forward Series', 'Cocoa Forward Series', 'Exploratory Series', 'Decaf Series'],
    ['Brew Gear', 'Merch'],
  ],
  all: 'Shop All',
}

export const aboutMenu = {
  groups: [['About', 'Contact', 'Jobs', 'Events', 'Brew Guide', 'Blog']],
}

export const menuLinks = (menu) => [...menu.groups.flat(), ...(menu.all ? [menu.all] : [])]
