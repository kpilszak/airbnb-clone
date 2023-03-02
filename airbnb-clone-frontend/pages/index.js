import React from 'react';
import { sanityClient, urlFor } from '../sanity';
import Link from 'next/link';

const Home = ({ properties }) => {
  console.log(properties);
  return (
    <>
    {properties && (
      <div className="main">
        <div className="feed-container">
          <h1>Places to stay near you</h1>
          <div className="feed">
            {properties.map((property) => (
              <Link href={`property/${property.slug.current}`}><div key={property._id} className="card">
                <img src={urlFor(property.mainImage)} />
              </div></Link>
            ))}
          </div>
          <div className="map"></div>
        </div>
      </div>
    )}
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[ _type == "property"]';
  const properties = await sanityClient.fetch(query);

  if (!properties.length) {
    return {
      props: {
        properties: [],
      },
    }
  } else {
    return {
      props: {
        properties
      }
    }
  }
}

export default Home;
