# BackendTestNexa-KukuhBiyantama
backend with express

test api:
login:
localhost:3000/auth/login
json example:
{
    "username":"inicoba",
    "password":"password"
}

register:
localhost:3000/admin/register
json example:
{
    "username":"inicoba",
    "password":"password"
}

insert karyawan:
insert bearer token from login
localhost:3000/karyawan/register
json example:
{
  "nama": "John Doe",
  "alamat": "123 Main Street",
  "gend": "1",
  "photo": "https://example.com/john_doe.jpg",
  "tgl_lahir": "1990-01-01",
  "status": "1"
}

get data karyawan:
insert token bearer
http://localhost:3000/karyawan/getkaryawan?keyword=John&start=0&count=10

get update karyawan:
insert token bearer
http://localhost:3000/karyawan/updatekaryawan/20237459
json example:
{
  "nama": "John Doe",
  "alamat": "123 Main Street",
  "tgl_lahir": "1990-01-01"
}

get deactivate karyawan
http://localhost:3000/karyawan/deactivatekaryawan/20237459
