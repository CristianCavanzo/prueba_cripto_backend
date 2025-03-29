import { ErrorResponse } from '@models';
import { ValidationError } from 'class-validator';

export const returnParsedError = (
    error: any
): { error: ErrorResponse[] | ErrorResponse; status: number } => {
    if (Array.isArray(error) && error[0] instanceof ValidationError) {
        const errores = error.map((err: ValidationError) => {
            const constraints = Object.values(err.constraints || {});
            return { property: err.property, constraints };
        });
        return { error: errores, status: 400 };
    }

    if (error instanceof Error) {
        console.log('log error', error);
    }

    if (error.customError) {
        return {
            error: {
                property: error.property,
                constraints: error.message,
            },
            status: 400,
        };
    }

    return {
        error: {
            property: 'Unknown error',
            constraints: 'Unknown error',
        },
        status: 500,
    };
};
