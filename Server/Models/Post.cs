using System;
using System.ComponentModel.DataAnnotations;
using Google.Cloud.Firestore;

namespace AspCoreServer.Models
{
    [FirestoreData]
    public class Post
    {
        [FirestoreProperty]
        public int ID { get; set; }

        [FirestoreProperty]
        public string Name { get; set; }

        [FirestoreProperty]
        public string Content { get; set; }

        [FirestoreProperty]
        public DateTime EntryTime { get; set; }
    }
}
