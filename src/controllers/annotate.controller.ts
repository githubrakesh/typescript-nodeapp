import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { MLProviders, fileAnnotate } from "../services/factories/file-annotate.service";
import { SampleValidator } from "../validators/sample.validator";
import logger from "../util/logger.util";


export class AnnotateController extends BaseController {


    public static test(req: Request, res: Response) {
        return res.json({
            code: 200,
            status: "Working",
        });
    }

    public static annotate(req: Request, res: Response) {

        fileAnnotate.annotateFile(MLProviders.GCP)
            .then(result => {
                return res.json(result[0].responses[0].labelAnnotations);

            }).catch(e => {
                return res.json({
                    code: 500,
                    status: "Failed",
                });
            });

    }
}
