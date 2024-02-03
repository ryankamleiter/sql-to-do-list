const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todos";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error getting tasks', error);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    let newTask = req.body;
    console.log(`Adding task`, newTask);

    let queryText = `INSERT INTO "todos" ("text") VALUES ($1);`;
    pool.query(queryText, [newTask.text])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(`error adding new task`, error);
            res.sendStatus(500);
        })
})

router.delete('/:id', (req, res) => {
    console.log('req params: ', req.params);

    let id = req.params.id;

    let queryText = `DELETE FROM "todos" WHERE "id" = $1;`;

    pool.query(queryText, [id])
        .then(
            (result) => {
                console.log(`DELETE query worked, ${queryText}`, result);
                res.sendStatus(204);
            }
        )
        .catch(
            (error) => {
                console.log(`DELETE query failed, ${queryText}`, error);
                res.sendStatus(500);
            });
})
router.put('/:id', (req, res) => {
    console.log('in put on server');
  
    let id = req.params.id;
  
    let queryText = `UPDATE todos SET "isComplete" = NOT "isComplete" WHERE id=$1;`;
  
    pool.query(queryText, [id])
      .then(
        (result) => {
          console.log(`PUT query worked, ${queryText}`, result);
          res.sendStatus(201);
        }
      )
      .catch(
        (error) => {
          console.log(`PUT query failed, ${queryText}`, error);
          res.sendStatus(500);
        }
      );
  })


module.exports = router;
