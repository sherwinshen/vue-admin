// ------------ 全局方法 ------------
import {MessageBox} from 'element-ui';

export default function global() {
    // 确认弹窗
    const confirm = (params) => {
        MessageBox.confirm(params.content, params.tip || "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: params.type || "warning",
            center: true
        }).then(() => {
            MessageBox({
                type: 'success',
                message: '删除成功!'
            }).then();
            params.fn && params.fn()
        }).catch(() => {
            MessageBox({
                type: 'info',
                message: '已取消删除'
            }).then();
            params.catchFn && params.catchFn()
        });
    }
    return {confirm}
}

