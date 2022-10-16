type RequestMetaDef<
  R extends {
    body?: Record<string, any>;
    query?: Record<string, string>;
  } = { body: {}; query: {} }
> = {
  body: R["body"] & {};
  query: R["query"] & {};
};

export type RequestMetaMap = {
  "/api/sweet-nothings": RequestMetaDef<{
    body: { sentences: string[] };
  }>;
  "/api/farmland/init-crops": RequestMetaDef;
  "/api/farmland/init-farmer": RequestMetaDef;
  "/api/farmland/status": RequestMetaDef<{
    query: { name: string };
  }>;
  "/api/farmland/on-sale": RequestMetaDef;
  "/api/farmland/buy-crop": RequestMetaDef<{
    body: {
      cropId: string;
      cropName: string;
      count: number;
    };
  }>;
  "/api/menstruation/record": RequestMetaDef<{
    body: {
      start: number;
      end: number;
    };
    query: {
      monthStr: string;
    };
  }>;
};
