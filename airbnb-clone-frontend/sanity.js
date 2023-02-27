import { createClient } from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';

const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: 'rtkudh9o',
    useCdn: process.env.NODE_ENV === 'production'
};

export const sanityClient = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(sanityClient).image(source);
