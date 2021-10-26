const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
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
});

router.get('/:id', async (req, res) => {
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
});

router.post('/', async (req, res) => {
  // create a new tag
  const createTag = await Tag.create({
    tag_name: req.body.tag_name,
  });

  return res.json(createTag);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updateTag = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  return res.json(updateTag);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const destroyTag = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(destroyTag);
});

module.exports = router;
