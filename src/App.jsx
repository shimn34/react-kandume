import { useEffect, useState } from "react";

export default function App() {
    const [syohin, setSyohin] = useState([]);
    const [category, setCategory] = useState("All");
    const [searchSyohin, setSearchSyohin] = useState("");

    useEffect(() => {
        fetch("/products.json")
            .then((response) => response.json())
            .then((data) => setSyohin(data));
    }, []);

    const filterSyohin = syohin.filter((syohin) => {
        return (
            (category === "All" || syohin.type === category.toLowerCase()) && syohin.name.toLowerCase().includes(searchSyohin.toLowerCase())
        );
    });

    return (
        <>
            <header>
                <h1>The Can Store</h1>
            </header>
            <div>
                <aside>
                    <form>
                        <div>
                            <label htmlFor="category">Choose a category:</label>
                            <select id="category" onChange={(e) => setCategory(e.target.value)}>
                                <option>All</option>
                                <option>Vegetables</option>
                                <option>Meat</option>
                                <option>Soup</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="searchTerm">Enter search term:</label>
                            <input type="text"
                                id="searchTerm"
                                placeholder="e.g. beans"
                                value={searchSyohin}
                                onChange={(e) => setSearchSyohin(e.target.value)} />
                        </div>
                        <div>
                            <button type="button">Filter results</button>
                        </div>
                    </form>
                </aside>
                <main>
                    {filterSyohin.map((syohin) => (
                        <section key={syohin.name} className={syohin.type}>
                            <h2>{syohin.name}</h2>
                            <p>${syohin.price.toFixed(2)}</p>
                            <img src={`/images/${syohin.image}`} alt={syohin.name} />
                        </section>
                    ))}
                </main>
            </div>
            <footer>
                <p>All icons found at the Noun Project:</p>
                <ul>
                    <li>
                        Bean can icon by{" "}
                        <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
                    </li>
                    <li>
                        Vegetable icon by{" "}
                        <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
                    </li>
                    <li>
                        Soup icon by{" "}
                        <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
                    </li>
                    <li>
                        Meat Chunk icon by{" "}
                        <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>.
                    </li>
                </ul>
            </footer>
        </>
    );
}