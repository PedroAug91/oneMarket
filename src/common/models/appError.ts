/**
 * Classe de erro personalizada para tratamento padronizado de erros na aplicação.
 *
 * @class AppError
 * @extends Error
 *
 * @example
 * throw new AppError({
 *     message: "Falha ao buscar usuário",
 *     resMessage: "Não foi possível obter o usuário",
 *     status: 404,
 * });
 *
 * throw new AppError({
 *     err: new Error("Deu ruim."),
 * });
 */
class AppError extends Error {
    readonly resMessage: string;
    readonly data: object | null;
    readonly status: number;
    readonly originalErr: Error | unknown;

    constructor(config: {
        resMessage?: string;
        message?: string;
        status?: number;
        data?: object | null;
        err?: Error | undefined;
    }) {
        const { resMessage, message, status, data, err } = config;

        super(
            err
                ? err.message
                : message || resMessage || "Internal Server Error.",
        );

        this.resMessage = resMessage || "Não foi possível concluir a operação";
        this.data = data || null;
        this.status = status || 500;
        this.originalErr = err;
    }
}

export default AppError;
