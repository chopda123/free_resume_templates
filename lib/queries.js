


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