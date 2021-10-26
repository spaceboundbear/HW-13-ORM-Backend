const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // find all tags
    const findAllTags = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        },
      ],
    });

    return res.json(findAllTags);
  } catch (error) {
    throw error;
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id`
    const findOneTag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'tag_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        },
      ],
    });

    return res.json(findOneTag);
  } catch (error) {
    throw error;
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new tag
    const createTag = await Tag.create({
      tag_name: req.body.tag_name,
    });

    return res.json(createTag);
  } catch (error) {
    throw error;
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a tag's name by its `id` value
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.json(updateTag);
  } catch (error) {
    throw error;
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete on tag by its `id` value
    const destroyTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json(destroyTag);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
