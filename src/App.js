import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import { images } from "./assets/images";
import { Fragment, useState, useEffect } from "react";

function App() {
    const [apiMain, setApiMain] = useState([]);
    const [apiFullFilm, setApiFullFilm] = useState([]);
    const [fullFilm, setFullFilm] = useState([]);

    useEffect(() => {
        fetch('https://6375c4dfb5f0e1eb85f8caa5.mockapi.io/films')
            .then(res => res.json())
            .then(res => {
                setApiFullFilm(res[0].data)
                setApiMain(res)
            })
        return
    }, [])

    useEffect(() => {
        apiFullFilm.forEach(film => {
            fetch(film.api)
                .then(res => res.json())
                .then(res => setFullFilm(e => e.concat(res)))
        })
    }, [apiFullFilm])


    if (apiFullFilm.length > 1 && fullFilm.length === apiFullFilm.length) {
        fullFilm.sort((a, b) => {
            a = new Date(a.movie.modified.time)
            b = new Date(b.movie.modified.time)

            return a > b ? -1 : a < b ? 1 : 0
        })
    }

    if (apiFullFilm.length > 0 && fullFilm.length === apiFullFilm.length)
        return (
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = route?.layout ? route.layout : Fragment;
                        const Page = route.element;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page apiMain={apiMain} dataFilm={fullFilm} />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        );
    else
        return (
            <div className="loadding-page">
                <img src={images.loading} alt="" />
            </div>
        );
}

export default App;
