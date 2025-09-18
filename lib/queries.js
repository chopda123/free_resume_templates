


export const templatesQuery = `
*[_type == "template"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  rating,
  careerStages,
  styles,
  role,
  tags,
  keyFeatures,
  canvaLink,
  mainImage{
    alt,
    asset->{
      url
    }
  }
}
`;
// Query for a single template by slug


export const blogPostsQuery = `
*[_type == "blog" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage{
    alt,
    asset->{
      url,
      metadata {
        dimensions
      }
    }
  },
  categories[]->{
    title,
    slug
  }
}
`;

export const blogPostQuery = `
*[_type == "blog" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage{
    alt,
    asset->{
      url,
      metadata {
        dimensions
      }
    }
  },
  categories[]->{
    title,
    slug
  },
  body
}
`;

export const categoriesQuery = `
*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description
}
`;

export const blogPostsByCategoryQuery = `
*[_type == "blog" && $category in categories[]->slug.current] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage{
    alt,
    asset->{
      url,
      metadata {
        dimensions
      }
    }
  },
  categories[]->{
    title,
    slug
  }
}
`;