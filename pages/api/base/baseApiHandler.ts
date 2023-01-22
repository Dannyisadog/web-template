import { NextApiRequest, NextApiResponse } from "next";

class BaseApiHandler {
  req: NextApiRequest;
  res: NextApiResponse;
  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  // success response
  json(data: Object) {
    return this.res.status(200).send(data);
  }

  // 400 response
  send400(errMsg: string) {
    return this.res.status(400).send({
      errMsg
    })
  }

  // 401 response
  send401(errMsg = "Authorization Required") {
    return this.res.status(401).send({
      errMsg
    })
  }

  // 403 response
  send403(errMsg = "Not Allowed To Access") {
    return this.res.status(403).send({
      errMsg
    })
  }

  // 404 response
  send404(errMsg = "Not Found") {
    return this.res.status(404).send({
      errMsg
    })
  }

  // 405 response
  send405(errMsg = "Method not Allowed") {
    return this.res.status(405).send({
      errMsg
    })
  }

  // 500 response
  send500(errMsg = "System Crash") {
    return this.res.status(500).send({
      errMsg
    })
  }
}

export default BaseApiHandler;