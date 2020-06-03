export const Paginator = (items, page: any = 1, perPage: any = 100) => {
  return new Promise((resolve, _reject) => {
    const offset = (page - 1) * perPage;

    const paginatedItems = items.slice(offset).slice(0, perPage);
    const totalPages = Math.ceil(items.length / perPage);

    return resolve({
      page,
      per_page: perPage,
      pre_page: page - 1 ? page - 1 : null,
      next_page: totalPages > page ? page + 1 : null,
      total: items.length,
      total_pages: totalPages,
      data: paginatedItems,
    });
  });
};
