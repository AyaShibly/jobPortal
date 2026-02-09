export const buildQuery = (queryParams) => {
    const queryObj = { ...queryParams };
    const excludedFields = ["page", "limit", "sort", "order"];
    excludedFields.forEach((field) => delete queryObj[field]);
    return queryObj;
};
export const getPagination = (queryParams) => {
    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 10;
    const skip = (page - 1) * limit;
    return { page, limit, skip };
};
export const getSortOptions = (queryParams) => {
    const sortField = queryParams.sort || "createdAt";
    const sortOrder = queryParams.order === "asc" ? 1 : -1;
    return { [sortField]: sortOrder };
};
//# sourceMappingURL=apiFeatures.js.map