export const blogQuery = `
    search(query: "+contenttype:Blog +live:true", limit: 9) {
        title
        identifier
        ... on Blog {
            urlMap
            modDate
            urlTitle
            description
            author {
                firstName
                lastName
            }
            image {
                title
                idPath
            }
        }
    }
`;

export const navigationQuery = `
DotNavigation(uri: "/", depth: 2) {
    href
    target
    title
    children {
        href
        target
        title
    }
}
`;

export const homeGraphQL = {
  page: `
        containers {
            containerContentlets {
                contentlets {
                    _map
                    ... on BannerCarousel {
                        banners {
                            title
                            caption
                            link
                            image {
                                title
                                idPath
                            }
                            buttonText
                        }
                    }
                }
            }
        }
    `,
  content: { blogs: blogQuery, navigation: navigationQuery },
};

export const pageGraphQL = {
  content: { navigation: navigationQuery },
};

export const blogListGraphQL = {
  content: { blogs: blogQuery, navigation: navigationQuery },
};

export const blogDetailGraphQL = {
  page: `
        urlContentMap {
            ... on Blog {
                title
                description
                modDate
                urlTitle
                body {
                    json
                }
                author {
                    firstName
                    lastName
                    image {
                        idPath
                        title
                    }
                }
                image {
                    idPath
                    title
                }
            }
        }
    `,
  content: { navigation: navigationQuery },
};
