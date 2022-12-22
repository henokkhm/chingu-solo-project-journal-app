export const fetchOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "api-key": process.env.MONGODB_ATLAS_DATA_API_KEY,
  },
};

export const fetchBody = {
  dataSource: process.env.MONGODB_DATA_SOURCE,
  database: process.env.MONGODB_DATABASE_NAME,
};

export const baseUrl = `${process.env.MONGODB_ATLAS_DATA_API_URL}/action`;
