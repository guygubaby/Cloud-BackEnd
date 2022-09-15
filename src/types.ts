type RequestMetaDef<
  ReqBody extends Record<string, any> = {},
  ReqQuery extends Record<string, string> = {}
> = {
  body: ReqBody;
  query: ReqQuery;
};
export type RequestMetaMap = {
  "/api/sweet-nothings": RequestMetaDef<{
    sentences: string[];
  }>;
  "/api/farmland/init-crops": RequestMetaDef;
  "/api/farmland/init-farmer": RequestMetaDef;
  "/api/farmland/status": RequestMetaDef<{}, { name: string }>;
  "/api/farmland/on-sale": RequestMetaDef;
  "/api/farmland/buy-crop": RequestMetaDef<{
    cropId: string;
    cropName: string;
    count: number;
  }>;
};
