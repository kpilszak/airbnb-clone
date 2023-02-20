import { sanityClient } from '../../sanity';
import React from 'react';
import { isMultiple } from "../../utils";

const Property = ({ 
    title,
    location,
    propertyType,
    mainImage,
    images,
    pricePerNight,
    beds,
    bedrooms,
    description,
    host,
    reviews
 }) => {
    return (
        <div className="container">
            <h1><b>{ title }</b></h1>
            <h2><b>{ propertyType } hosted by { host?.name }</b></h2>
            <h4>{bedrooms} bedroom{ isMultiple(bedrooms) } * { beds } bed{ isMultiple(beds) }</h4>
        </div>
    )
}

export const getServerSideProps = async (pageContext) => {
    const pageSlug = pageContext.query.slug;
    const query = `*[ _type == "property" && slug.current == $pageSlug][0]{
        title,
        location,
        propertyType,
        mainImage,
        images,
        pricePerNight,
        beds,
        bedrooms,
        description,
        host -> {
            _id,
            name,
            slug,
            image
        },
        reviews[] {
            ...,
            traveller -> {
                _id,
                name,
                slug,
                image
            }
        }
    }`

    const property = await sanityClient.fetch(query, { pageSlug });

    if (!property) {
        return {
            props: null,
            notFound: true
        }
    } else {
        return {
            props: {
                title: property.title,
                location: property.location,
                propertyType: property.propertyType,
                mainImage: property.mainImage,
                images: property.images,
                pricePerNight: property.pricePerNight,
                beds: property.beds,
                bedrooms: property.bedrooms,
                description: property.description,
                host: property.host,
                reviews: property.reviews
            }
        }
    }
}

export default Property;