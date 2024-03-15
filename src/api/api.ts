import request from "./request";

export const getActicles = () => {
  return request({
    url: "/articles",
    method: "get",
  });
};

// 增加浏览量
export const addView = (idv: string) => {
  // 把id转为数值
  let id = Number(idv);
  return request({
    url: `/addPreview`,
    method: "post",
    data: {
      id,
    },
  });
};
