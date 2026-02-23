import styled from "styled-components";
import type { NekoAsset } from "../interfaces/NekoData";

const Gallery = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: calc(20px + 0.5vw);
    justify-content: center;
    font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
`;

const AssetCard = styled.div`
    max-width: 80vw;
    border: calc(2px + 0.1vw) solid gainsboro;
    border-radius: calc(12px + 0.1vh);
    overflow: hidden;
    background: white;
    
    @media (max-width: 500px) {
        width: 100%;
    }
    
`;

const Image = styled.img`
    width: 100%;
    max-height: 50vh;
    object-fit: cover;

    @media (max-width: 500px) {
        max-height: 100%;
    }
    
`;

const Info = styled.div`
    padding: 2%;
    font-size: calc(14px + 0.1vh);
`;

export default function NekoDisplay({ assets }: { assets: NekoAsset[] }) {
    if (assets.length === 0) return <p>Enter keyword to search</p>;

    return (
        <Gallery>
            {assets.map((asset, index) => (
                <AssetCard key={index}>
                    <Image src={asset.url} alt="Neko asset" />
                    <Info>

                        {asset.artist_name && (
                            <p><strong>Artist:</strong> {asset.artist_name}</p>
                        )}

                        {asset.source_url && (
                            <a href={asset.source_url} target="_blank" rel="noreferrer">
                                View Source
                            </a>
                        )}
                    </Info>
                </AssetCard>
            ))}
        </Gallery>
    );
}