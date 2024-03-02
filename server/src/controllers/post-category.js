import * as postCategoryService from '../services/post-category';

export const getPostCategories = async (req, res) => {
    try {
        const response = await postCategoryService.getPotCategories();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};
