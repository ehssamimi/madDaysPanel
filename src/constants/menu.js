const data = [
    {
        id: "resourceManagement",
        icon: "iconsminds-air-balloon-1",
        label: "Resource Management",
        to: "/resource-management/game-mode",
        subs: [
              {
                icon: "simple-icon-layers",
                label: "Game Mode",
                to: "/resource-management/game-mode",
                subs: [
                    {
                        icon: "simple-icon-arrow-right",
                        label: "add",
                        to: "/resource-management/game-mode/add"
                    },
                    {
                        icon: "simple-icon-arrow-right",
                        label: "show",
                        to: "/resource-management/game-mode/show"
                    }
                    ]
            },
            {
                icon: "simple-icon-layers",
                label: "Game Currency",
                to: "/resource-management/game-currency",
                subs: [
                    {
                        icon: "simple-icon-arrow-right",
                        label: "add",
                        to: "/resource-management/game-currency/add"
                    },
                    {
                        icon: "simple-icon-arrow-right",
                        label: "show",
                        to: "/resource-management/game-currency/show"
                    }
                ]
            },
            {
                icon: "simple-icon-layers",
                label: "Game Item",
                to: "/resource-management/game-item",
                subs: [
                    {
                        icon: "simple-icon-arrow-right",
                        label: "add",
                        to: "/resource-management/game-item/add"
                    },
                    {
                        icon: "simple-icon-arrow-right",
                        label: "show",
                        to: "/resource-management/game-item/show"
                    }
                ]
            },   {
                icon: "simple-icon-layers",
                label: "Action Exp",
                to: "/resource-management/exp",
                subs: [
                    {
                        icon: "simple-icon-arrow-right",
                        label: "action with key",
                        to: "/resource-management/exp/update-key"
                    },
                    {
                        icon: "simple-icon-arrow-right",
                        label: "action each level",
                        to: "/resource-management/exp/update-level"
                    }
                ]
            },
            {
                icon: "simple-icon-layers",
                label: "Loot Box",
                to: "/resource-management/loot-box",
                subs: [
                    {
                        icon: "simple-icon-arrow-right",
                        label: "Add",
                        to: "/resource-management/loot-box/add"
                    },
                    {
                        icon: "simple-icon-arrow-right",
                        label: "Show",
                        to: "/resource-management/loot-box/show"
                    }
                ]
            },
            {
                icon: "simple-icon-layers",
                label: "shop",
                to: "/resource-management/shop",
                subs: [
                    {
                        icon: "simple-icon-arrow-right",
                        label: "add",
                        to: "/resource-management/shop/add"
                    },
                    {
                        icon: "simple-icon-arrow-right",
                        label: "show",
                        to: "/resource-management/shop/show"
                    }
                ]
            }

        ]
    },
  // {
  //   id: "gogo",
  //   icon: "iconsminds-air-balloon-1",
  //   label: "menu.gogo",
  //   to: "/app/gogo",
  //   subs: [
  //     {
  //       icon: "simple-icon-paper-plane",
  //       label: "menu.start",
  //       to: "/app/gogo/start"
  //     }
  //   ]
  // },
  // {
  //   id: "secondmenu",
  //   icon: "iconsminds-three-arrow-fork",
  //   label: "menu.second-menu",
  //   to: "/app/second-menu",
  //   subs: [
  //     {
  //       icon: "simple-icon-paper-plane",
  //       label: "menu.second",
  //       to: "/app/second-menu/second"
  //     }
  //   ]
  // },
  // {
  //   id: "blankpage",
  //   icon: "iconsminds-bucket",
  //   label: "menu.blank-page",
  //   to: "/app/blank-page"
  // },
  // {
  //   id: "docs",
  //   icon: "iconsminds-library",
  //   label: "menu.docs",
  //   to: "https://gogo-react-docs.coloredstrategies.com/",
  //   newWindow:true
  // }
];
export default data;
