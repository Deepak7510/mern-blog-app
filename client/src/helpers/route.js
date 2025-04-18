export const RouteIndex = '/'
export const RouteSignIn = '/sign-in'
export const RouteSignUp = '/sign-up'
export const RouteProfile = '/profile'
export const RouteAdminBlog = '/blog'
export const RouteBlogDetails = (category, blog) => {
    if (!category || !blog) {
        return '/blog/details/:category/:blog';
    } else {
        return `/blog/details/${category}/${blog}`
    }
}

export const RouteBlogByCategory = (category) => {
    if (category) {
        return `/blog/${category}`
    } else {
        return '/blog/:category/'
    }
}

export const RouteBlogSearch=(query)=>{
    if(query){
        return `/blog/search?input=${query}`
    }else{
        return `/blog/search`
    }
}

export const RouteAdminCategory = '/category'
export const RouteComments = '/comments'
export const RouteUsers = '/users'


