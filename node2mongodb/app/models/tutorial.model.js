module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      Name: String,
      cafe_number: Number,
      id: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutorial = mongoose.model("cafe", schema);
  return Tutorial;
};
