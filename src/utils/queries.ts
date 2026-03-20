export const blogQuery = `
    search(query: "+contenttype:Blog +live:true", limit: 9) {
        title
        identifier
        ... on Blog {
            inode
            urlMap
            modDate
            urlTitle
            author {
                firstName
                lastName
                inode
            }
            image {
                title
                idPath
                width
                height
                focalPoint
            }
        }
    }
`;


export const navigationQuery = `
DotNavigation(uri: "/", depth: 2) {
    ...NavProps
    children {
        ...NavProps
    }
}
`;

export const fragmentNav = `
fragment NavProps on DotNavigation {
    code
    folder
    hash
    host
    href
    languageId
    order
    target
    title
    type
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
                                width
                                height
                                focalPoint
                            }
                            buttonText
                        }
                    }

                    ... on BlogList {
                        blogs {
                            identifier
                            title
                            description
                            inode
                            urlMap
                            modDate
                            urlTitle
                            author {
                                firstName
                                lastName
                                inode
                            }
                            image {
                                title
                                idPath
                                width
                                height
                                focalPoint
                            }
                        }
                    }
                }
            }
        }
    `,
    content: { blogs: blogQuery, navigation: navigationQuery },
    fragments: [fragmentNav],
};

export const pageGraphQL = {
    content: { navigation: navigationQuery },
    fragments: [fragmentNav],
};

export const blogListGraphQL = {
    content: { blogs: blogQuery, navigation: navigationQuery },
    fragments: [fragmentNav],
};

export const blogDetailGraphQL = {
    page: `
        urlContentMap {
            ... on Blog {
                author {
                    firstName
                    lastName
                    title
                    inode
                }
                image {
                    idPath
                    title
                }
            }
        }
    `,
    content: { navigation: navigationQuery },
    fragments: [fragmentNav],
};
