const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const catFindAll = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        },
      ],
    });

    return res.json(catFindAll);
  } catch (error) {
    throw error;
  }
});

router.get('/:id', async (req, res) => {
  try {
    const catFindOne = await Category.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'category_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        },
      ],
    });

    return res.json(catFindOne);
  } catch (error) {
    throw error;
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCat = await Category.create({
      category_name: req.body.category_name,
    });

    return res.json(createCat);
  } catch (error) {
    throw error;
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCat = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.json(updateCat);
  } catch (error) {
    throw error;
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete a category by its `id` value
    const destroyCat = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json(destroyCat);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
