import Default from "../layouts/Default/Default.jsx";
import NoNav from "../layouts/NoNav/NoNav.jsx";
import Film from "../pages/Film/Film.jsx";
import Home from "../pages/Home/Home.jsx";
import All from "../pages/type/All.jsx";
import Series from "../pages/type/Series.jsx";
import Single from "../pages/type/Single.jsx";
import Tvshows from "../pages/type/Tvshows.jsx";
import Hoathinh from "../pages/type/Hoathinh.jsx";
import Sapchieu from "../pages/type/Sapchieu.jsx";

export const publicRoutes = [
    { path: "/", element: Home, layout:  Default},

    { path: "/toan-bo-phim", element: All, layout:  Default},
    { path: "/toan-bo-phim/:slug", element: Film, layout:  NoNav},
    { path: "/toan-bo-phim/trang-:i", element: All, layout:  Default},
    { path: "/toan-bo-phim/trang-:i/:slug", element: Film, layout:  NoNav},

    { path: "/phim-bo", element: Series, layout:  Default},
    { path: "/phim-bo/:slug", element: Film, layout:  NoNav},
    { path: "/phim-bo/trang-:i", element: Series, layout:  Default},
    { path: "/phim-bo/trang-:i/:slug", element: Film, layout:  NoNav},

    { path: "/phim-le", element: Single, layout:  Default},
    { path: "/phim-le/:slug", element: Film, layout:  NoNav},
    { path: "/phim-le/trang-:i", element: Single, layout:  Default},
    { path: "/phim-le/trang-:i/:slug", element: Film, layout:  NoNav},

    { path: "/tv-shows", element: Tvshows, layout:  Default},
    { path: "/tv-shows/:slug", element: Film, layout:  NoNav},
    { path: "/tv-shows/trang-:i", element: Tvshows, layout:  Default},
    { path: "/tv-shows/trang-:i/:slug", element: Film, layout:  NoNav},

    { path: "/hoat-hinh", element: Hoathinh, layout:  Default},
    { path: "/hoat-hinh/:slug", element: Film, layout:  NoNav},
    { path: "/hoat-hinh/trang-:i", element: Hoathinh, layout:  Default},
    { path: "/hoat-hinh/trang-:i/:slug", element: Film, layout:  NoNav},

    { path: "/sap-chieu", element: Sapchieu, layout:  Default},
    { path: "/sap-chieu/:slug", element: Film, layout:  NoNav},
    { path: "/sap-chieu/trang-:i", element: Sapchieu, layout:  Default},
    { path: "/sap-chieu/trang-:i/:slug", element: Film, layout:  NoNav},

    { path: "/:slug", element: Film, layout:  NoNav},
];

