import { useState, useEffect } from "react";
import styled from "styled-components";
import NekoDisplay from "./components/NekoDisplay";
import type { NekoAsset, NekoResponse } from "./interfaces/NekoData";

const ParentDiv = styled.div`
    width: 80vw;
    min-height: 150vh;
    margin: 0 auto;
    text-align: center;
    background-color: aliceblue;
    
    @media (max-width: 750px) {
        width: 100%;
    } 
`;

const PageWrapper = styled.div`
    padding: 5vh 5vw 20vh 5vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Title = styled.h1`
    font-family: "Segoe UI Bold", "Roboto Bold", "Helvetica Neue", Arial, sans-serif;
    font-size: calc(28px + 3vw);
    margin-bottom: 2vh;
    
    // gradient colors
    background: linear-gradient(45deg, lightgreen, deepskyblue);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: calc(1px + 0.1vw) darkblue;
`;

const SearchContainer = styled.div`
    width: 80%;
    margin: 0 auto 3% auto;
    display: flex;
    padding: 0.5vh 0;
    justify-content: center;
    font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    gap: calc(3px + 1vw);
`;

const SearchInput = styled.input`
    width: 100%;
    padding: calc(5px + 0.5vh) calc(10px + 0.5vw);
    border: calc(1px + 0.1vw) solid lightsteelblue;
    border-radius: calc(2px + 0.5vw);
    font-size: calc(10px + 0.5vw);

    &:focus {
        border-color: lightseagreen;
        outline: none;
    }
`;

const SearchButton = styled.button`
    padding: calc(5px + 0.5vh) calc(10px + 0.5vw);
    background-color: cadetblue;
    color: white;
    border: none;
    border-radius: calc(2px + 0.5vw);
    cursor: pointer;
    font-weight: bold;
    
    &:hover {
        background-color: steelblue;
    }
`;

export default function App() {
    const [assets, setAssets] = useState<NekoAsset[]>([]);

    // tempQuery: to record real-time text in the input box
    const [tempQuery, setTempQuery] = useState("neko");

    // searchQuery: to record query to search after clicking search button
    const [searchQuery, setSearchQuery] = useState("neko");

    // handleSearch: function to call after clicking button or pressing return key
    const handleSearch = () => {
        setSearchQuery(tempQuery);
    };

    // run useEffect when searchQuery changes
    useEffect(() => {
        async function fetchData() {
            if (!searchQuery) return; // don't search if no words entered
            try {
                const url = `https://nekos.best/api/v2/search?query=${searchQuery}&type=1&amount=10`;
                const response = await fetch(url);
                const result: NekoResponse = await response.json();
                setAssets(result.results || []);
            } catch (e) {
                console.error("Fetch error: ", e);
            }
        }
        fetchData().catch(console.error);
    }, [searchQuery]); // dependency: searchQuery (not tempQuery)

    return (
        <ParentDiv>
            <PageWrapper>
                <Title>Neko Asset Search</Title>

                <SearchContainer>
                    <SearchInput
                        type="text"
                        value={tempQuery}
                        onChange={(e) => setTempQuery(e.target.value)}

                        // Search if return key is pressed
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                        placeholder="Enter keywords"
                    />
                    <SearchButton onClick={handleSearch}>Search</SearchButton>
                </SearchContainer>

                <NekoDisplay assets={assets} />
            </PageWrapper>
        </ParentDiv>
    );
}