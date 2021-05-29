import React from 'react'

export const WithSuspense = (Component: any) => {
    return (props: any) => {
        return <React.Suspense fallback={<div>Loading...</div>}>
            <Component {...props}/>
        </React.Suspense>
    }
}