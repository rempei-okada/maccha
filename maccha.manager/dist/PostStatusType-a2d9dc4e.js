import { k as _assign } from './index-e5acb89e.js';

var PostStatusType;
(function (PostStatusType) {
    PostStatusType[PostStatusType["Drafting"] = 0] = "Drafting";
    PostStatusType[PostStatusType["Public"] = 1] = "Public";
    PostStatusType[PostStatusType["Private"] = 2] = "Private";
})(PostStatusType || (PostStatusType = {}));
var postStatusTypes = [
    { display: "公開", value: PostStatusType.Public },
    { display: "限定公開", value: PostStatusType.Private },
    { display: "下書き保存", value: PostStatusType.Drafting }
];
var postStatusTypeDisplay = postStatusTypes.reduce(function (x, y) {
    var _a;
    return (_assign(_assign({}, x), (_a = {}, _a[y.value] = y.display, _a)));
}, {});

export { postStatusTypes as a, postStatusTypeDisplay as p };
