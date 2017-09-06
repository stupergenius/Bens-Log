# Key Derivation Functions and Password Hashing

With [so many](https://www.troyhunt.com/inside-the-massive-711-million-record-onliner-spambot-dump/) data [breaches](https://www.devicelock.com/blog/2960.html) in the news, and with so many [user accounts](https://www.nytimes.com/2016/12/14/technology/yahoo-hack.html?mcubz=3) being leaked, the question of *[have I been pwned](https://haveibeenpwned.com)* is becoming more common than ever. Worst case, leaked passwords are stored in plain text or in an insecure hash format (e.g. [MD5](https://www.schneier.com/cgi-bin/mt/mt-search.cgi?search=MD5&__mode=tag&IncludeBlogs=2&limit=10&page=1)). However, one of the strongest techniques to store password material is by hashing the password using a Key Derivation Function (aka a KDF). This technique is becoming more popular in the wake of such breaches, but understanding how it works and how it promises to strengthen password storage is often glossed over.

In short, KDFs were designed to derive keys using a combination of secret and non-secret shared key material, often with the aim of using the derived key in another cryptographic system. However, KDFs also have some advantages when used as password hashing algorithms. Given the seeming inevitability of data breaches, these advantages have made them popular in the recent past to protect against increasingly sophisticated and well-equipped attackers. Indeed, NIST now recommends (in section 5.1 of the [Digital Identify Guidelines](http://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-63b.pdf)) using a KDF to hash passwords.

One of the main benefits of KDFs, when used as a password hashing algorithm, is the ability to "tune" the KDF when deriving a key. Many specific KDFs allow specifying parameters such as an arbitrary amount of time or iterations, an amount of computer memory, and the degree of parallelism or thread count. These parameters can be used to customize a KDF to require as much time, memory, or threads as necessary to deter attackers from being able to feasibly employ brute force or dictionary based attacks. When tuning these parameters, it's important to keep legitimate uses in mind, such that when authenticating valid users, deriving the key should take around 1/10th of a second and a small fraction of the system memory. This ensures valid users receive a quick authentication response, but will significantly slow down attackers.

Some KDF implementations commonly used for password hashing include PBKDF2, scrypt, and Argon2. Of the three, PBKDF2 is likely more common, but scrypt is often seen as an improvement because it requires more memory (i.e. it has a high "space cost") and as such requires more computer resources to derive a key. Argon2 is the winner of the [Password Hashing Competition](https://password-hashing.net) and allows tuning all it's KDF parameters, including the degree of parallelism. However, its adoption is much lower than either PBKDF2 or scrypt.

A simple demonstration of Argon2 follows:

```bash
# Parameters: 5 iterations, 2^18 KiB of memory, 32 threads
$ echo "password" | argon2 "way too salty" -t 5 -m 18 -p 32
Type:          Argon2i
Iterations:    5
Memory:        262144 KiB
Parallelism:   32
Hash:          35a2af9a4fb65b6c02b3f3524c28d74c9115aa0184da81d9a7acfb4a69b8f0e9
2.094 seconds

# Parameters: 10 iterations, 2^18 KiB of memory, 32 threads
$ echo "password" | argon2 "way too salty" -t 5 -m 18 -p 32
Type:          Argon2i
Iterations:    10
Memory:        262144 KiB
Parallelism:   32
Hash:          6da5c87c913cfe9e5b30c29f80035e980736e5174b48161e7926ac18280e907d
3.813 seconds
```

As the above demonstration shows, changing the number of iterations from 5 to 10 not only makes the derivation slower (by more than a second) but also derives a different key. Thus, it's common for implementors to either fix the KDF parameters or to store them alongside the derived key itself.

Given the above, it's clear that KDFs are the modern best practices for hashing passwords, and also why they're a best practice should be made clearer. In general, using a KDF with a reasonable time to compute for legitimate uses will 1) ensure valid users receive a quick response and 2) ensure that attackers will be significantly slowed in their endeavors.
