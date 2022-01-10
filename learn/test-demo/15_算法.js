let arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
];

function tree(params) {
  let deleteArr = [];
  params.forEach(e => {
    const { pid, id } = e;
    let parentInd = params.findIndex(c => c.id === pid);

    if (parentInd > -1) {
      deleteArr.push(id);
      if (params[parentInd].children) {
        params[parentInd].children.push(e);
      } else {
        params[parentInd].children = [e];
      }
    }
  });

  deleteArr.forEach(e => {
    const ind = params.findIndex(c => c.id === e);
    if (ind > -1) {
      params.splice(ind, 1);
    }
  });

  console.log(params);
}

tree(arr);
