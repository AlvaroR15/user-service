export const successResponse = (message: string, status: number, data: any | null) => {
    return {
        success: true,
        status,
        message,
        data
    }
}


export const errorResponse = (message: string, status: number) => {
    return {
        success: false,
        status,
        message
    }
}


export const generalErrorResponse = () => {
    return {
        success: false,
        status: 500,
        message: 'Internal server error.'
    }
}