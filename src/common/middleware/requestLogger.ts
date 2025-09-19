import { DateTime } from "luxon";

import type { NextFunction, Request, Response } from "express";

function getDateTime() {
    // const dt = Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "medium" }).formatToParts(new Date())
    const dt = DateTime.now().setZone("America/Recife");

    return dt.toLocaleString({
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

function logger(req: Request, res: Response, next: NextFunction) {
    const path: string = req.path;
    const method = req.method;

    const ip: string | undefined =
        req.ip || (req.socket && req.socket.remoteAddress) || undefined;

    const dateTime = getDateTime();

    res.on("finish", () => {
        const status: number | undefined = res.statusCode;
        const logStr: string = `${ip} [${dateTime}] "${method} ${path} ${status}"`;
        console.log(logStr);
    });

    next();
}

export default logger;
