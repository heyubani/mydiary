const fileUpLoad = (req, res) => {
    if (!req.files) return res.status(400).send('No files were uploaded!');
  
    const { foo } = req.files;
    const uploadTo = `uploads/${foo.name}`;
  
    foo.mv(uploadTo, (err) => {
      if (err) return res.status(500).send(err);
  
      res.send(`File uploaded to <a href="${uploadTo}">${uploadTo}</a>`);
    });
  };

  module.exports = fileUpLoad;